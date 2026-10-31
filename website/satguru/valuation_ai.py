"""
Sadguru Motors - Car Valuation AI Engine
Sector 14, Gurgaon (HR-26)
Python Module for Used Car Price Estimation & Depreciation Analytics
"""

import sys
import json
from datetime import datetime

class SadguruValuationAI:
    def __init__(self):
        # Base brand multiplier table (Average new price reference in Lakhs INR)
        self.brand_base_prices = {
            "hyundai": {"base": 12.5, "resale_retention": 0.90},
            "maruti": {"base": 8.0, "resale_retention": 0.94},
            "tata": {"base": 13.5, "resale_retention": 0.88},
            "mahindra": {"base": 16.0, "resale_retention": 0.92},
            "honda": {"base": 13.0, "resale_retention": 0.89},
            "toyota": {"base": 24.0, "resale_retention": 0.96},
            "kia": {"base": 14.5, "resale_retention": 0.90},
            "bmw": {"base": 45.0, "resale_retention": 0.82},
            "audi": {"base": 42.0, "resale_retention": 0.82},
            "mercedes": {"base": 48.0, "resale_retention": 0.84}
        }
        self.current_year = 2026

    def estimate_value(self, brand: str, model: str, year: int, km: int, condition: str = "good") -> dict:
        brand_clean = brand.strip().lower()
        brand_info = self.brand_base_prices.get(brand_clean, {"base": 10.0, "resale_retention": 0.88})

        # Calculate vehicle age
        age = max(1, self.current_year - int(year))

        # Standard depreciation schedule:
        # Year 1: 15% drop, Year 2-5: 9% drop/yr, Year 5+: 7% drop/yr
        depreciation = 1.0
        for y in range(1, age + 1):
            if y == 1:
                depreciation *= 0.85
            elif y <= 5:
                depreciation *= 0.91
            else:
                depreciation *= 0.93

        # Apply brand resale retention modifier
        retention_modifier = brand_info["resale_retention"] ** (age * 0.5)

        # Kilometer factor: 10,000 km/yr is standard. Excess km reduces value slightly.
        expected_km = age * 12000
        km_difference = km - expected_km
        km_factor = 1.0 - (km_difference / 100000.0) * 0.05
        km_factor = max(0.80, min(1.10, km_factor))

        # Condition factor
        condition_factors = {
            "excellent": 1.05,
            "good": 1.00,
            "fair": 0.92,
            "needs_work": 0.82
        }
        cond_mult = condition_factors.get(condition.lower(), 1.0)

        # Calculate estimated value
        estimated_val = brand_info["base"] * depreciation * retention_modifier * km_factor * cond_mult
        estimated_val = max(1.8, round(estimated_val, 2))

        # Range +/- 6%
        min_val = round(estimated_val * 0.94, 2)
        max_val = round(estimated_val * 1.06, 2)

        return {
            "brand": brand,
            "model": model,
            "year": year,
            "km": km,
            "estimated_price_lakhs": estimated_val,
            "min_offer_lakhs": min_val,
            "max_offer_lakhs": max_val,
            "gurgaon_bonus": "Included (Free RC Transfer HR-26)",
            "inspection_time_minutes": 45,
            "status": "success"
        }

if __name__ == "__main__":
    ai = SadguruValuationAI()
    # Test valuation
    res = ai.estimate_value(brand="Hyundai", model="Creta SX", year=2022, km=24000)
    print(json.dumps(res, indent=2))
