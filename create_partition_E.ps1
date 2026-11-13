# Requires Run as Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "Please run this script as Administrator."
    exit 1
}

try {
    Write-Host "=== Creating 50 GB Partition (E:) from C: ===" -ForegroundColor Cyan
    
    # 1. Check C: partition
    $c = Get-Partition -DriveLetter C
    $shrinkBytes = 50GB
    
    # Check initial supported shrink size
    $supported = Get-PartitionSupportedSize -DriveLetter C
    $maxShrinkBytes = $c.Size - $supported.SizeMin
    $maxShrinkGB = [math]::Round($maxShrinkBytes / 1GB, 2)
    Write-Host "Current maximum shrink limit: $maxShrinkGB GB" -ForegroundColor Gray

    if ($maxShrinkBytes -lt $shrinkBytes) {
        Write-Host "`n[!] Windows unmovable files (like NTFS USN Journal) are blocking the shrink." -ForegroundColor Yellow
        Write-Host "    Clearing unmovable files now to free up space..." -ForegroundColor Cyan

        # Step A: Delete NTFS USN Journal (diagnosed by Event 259 as $Extend\$UsnJrnl:$J:$DATA)
        Write-Host "  -> Clearing NTFS USN Journal..." -ForegroundColor Yellow
        fsutil usn deletejournal /D /N C: | Out-Null

        # Step B: Temporarily disable hibernation (removes hiberfil.sys)
        Write-Host "  -> Temporarily turning off hibernation..." -ForegroundColor Yellow
        powercfg /h off

        # Step C: Clear shadow copies if any exist
        Write-Host "  -> Clearing shadow storage copies..." -ForegroundColor Yellow
        vssadmin delete shadows /for=c: /all /quiet | Out-Null

        # Step D: Consolidate free space
        Write-Host "  -> Consolidating free space (takes ~10 seconds)..." -ForegroundColor Yellow
        defrag C: /X /H | Out-Null

        # Re-check supported size
        $supported = Get-PartitionSupportedSize -DriveLetter C
        $maxShrinkBytes = $c.Size - $supported.SizeMin
        $maxShrinkGB = [math]::Round($maxShrinkBytes / 1GB, 2)
        Write-Host "  -> Updated maximum shrink limit: $maxShrinkGB GB" -ForegroundColor Green
    }

    $targetSize = $c.Size - $shrinkBytes

    if ($targetSize -lt $supported.SizeMin) {
        throw "Could not reach 50 GB shrink limit. Maximum shrinkable right now is $maxShrinkGB GB."
    }

    # 2. Check if E: is already in use
    if (Get-Partition -DriveLetter E -ErrorAction SilentlyContinue) {
        throw "Drive letter E is already in use by another partition or volume."
    }

    # 3. Shrink C: partition
    Write-Host "`n1. Shrinking C: drive by 50 GB..." -ForegroundColor Cyan
    Resize-Partition -DriveLetter C -Size $targetSize

    # 4. Create new partition on Disk 0 in the unallocated space
    Write-Host "2. Creating new partition with drive letter E..." -ForegroundColor Cyan
    $newPart = New-Partition -DiskNumber $c.DiskNumber -UseMaximumSize -DriveLetter E

    # 5. Format the new volume
    Write-Host "3. Formatting partition E: as NTFS with label 'E'..." -ForegroundColor Cyan
    Format-Volume -DriveLetter E -FileSystem NTFS -NewFileSystemLabel "E" -Confirm:$false

    # Re-enable hibernation
    powercfg /h on

    Write-Host "`n===============================================" -ForegroundColor Green
    Write-Host " SUCCESS! Partition E: (50 GB) Created!" -ForegroundColor Green
    Write-Host "===============================================" -ForegroundColor Green
    Get-Volume -DriveLetter E | Select-Object DriveLetter, FriendlyName, FileSystemType, @{Name="Size(GB)";Expression={[math]::Round($_.Size / 1GB, 2)}}
}
catch {
    powercfg /h on
    Write-Error $_.Exception.Message
}
