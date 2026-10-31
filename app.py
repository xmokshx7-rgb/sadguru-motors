"""
Sadguru Motors - Python HTTP Backend & Inventory Management Server
Sector 14, Gurgaon (HR-26)
Serves static frontend and provides full REST API for inventory, valuation, and test drive leads.
Works with standard Python 3.x with zero external pip dependencies.
"""

import http.server
import socketserver
import os
import json
import urllib.parse
from valuation_ai import SadguruValuationAI

PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
CARS_FILE = os.path.join(DATA_DIR, "cars.json")

valuation_engine = SadguruValuationAI()

def get_cars():
    if os.path.exists(CARS_FILE):
        try:
            with open(CARS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading {CARS_FILE}: {e}")
    return []

def save_cars(cars):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(CARS_FILE, "w", encoding="utf-8") as f:
        json.dump(cars, f, indent=2, ensure_ascii=False)

class SadguruHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path in ["/admin", "/admin/"]:
            self.path = "/admin.html"
            return super().do_GET()

        if path in ["/api/cars", "/api/inventory"]:
            cars = get_cars()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(cars, ensure_ascii=False).encode("utf-8"))
            return

        elif path == "/api/health":
            cars = get_cars()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "dealership": "Sadguru Motors Sector 14 Gurgaon", "carsCount": len(cars)}).encode("utf-8"))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body.decode("utf-8"))
        except Exception:
            data = {}

        if path == "/api/cars":
            if not data.get("name"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Car name is required"}).encode("utf-8"))
                return

            cars = get_cars()
            new_id = data.get("id") or f"car-{int(os.times().system * 1000)}"
            data["id"] = new_id
            if "status" not in data:
                data["status"] = "available"
            cars.insert(0, data)
            save_cars(cars)

            self.send_response(201)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "कार सफलतापूर्वक अपलोड कर दी गई है।", "car": data}, ensure_ascii=False).encode("utf-8"))
            return

        elif path == "/api/valuation":
            brand = data.get("brand", "Hyundai")
            model = data.get("model", "Creta")
            try:
                year = int(data.get("year", 2020))
                km = int(data.get("km", 30000))
            except Exception:
                year, km = 2020, 30000
            
            result = valuation_engine.estimate_value(brand, model, year, km)
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(result, ensure_ascii=False).encode("utf-8"))
            return

        elif path == "/api/test-drive":
            lead_id = f"TD-GURGAON-{int(os.times().system * 1000)}"
            response_payload = {
                "booking_id": lead_id,
                "status": "confirmed",
                "message": "आपकी टेस्ट ड्राइव रिक्वेस्ट रजिस्टर हो गई है। हमारी सेक्टर 14 टीम आपसे संपर्क करेगी।",
                "received_data": data
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response_payload, ensure_ascii=False).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        car_id = None
        if path.startswith("/api/cars/"):
            car_id = path.replace("/api/cars/", "").strip()
        elif "id" in query:
            car_id = query["id"][0]

        if not car_id:
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Car ID required"}).encode("utf-8"))
            return

        cars = get_cars()
        prev_len = len(cars)
        cars = [c for c in cars if c.get("id") != car_id]

        if len(cars) == prev_len:
            self.send_response(404)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Car not found"}).encode("utf-8"))
            return

        save_cars(cars)
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "message": "गाड़ी हटा दी गई है।", "deletedId": car_id, "remaining": len(cars)}, ensure_ascii=False).encode("utf-8"))

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        car_id = path.replace("/api/cars/", "").strip() if path.startswith("/api/cars/") else None
        if not car_id:
            self.send_response(400)
            self.end_headers()
            return

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        try:
            update_data = json.loads(body.decode("utf-8"))
        except Exception:
            update_data = {}

        cars = get_cars()
        found = False
        for i, c in enumerate(cars):
            if c.get("id") == car_id:
                cars[i].update(update_data)
                found = True
                break

        if not found:
            self.send_response(404)
            self.end_headers()
            return

        save_cars(cars)
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"success": True, "car": update_data}, ensure_ascii=False).encode("utf-8"))

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SadguruHTTPHandler) as httpd:
        print(f"================================================================")
        print(f"🚗 Sadguru Motors Python Server running at http://localhost:{PORT}")
        print(f"🛠️ Dealer Admin Portal: http://localhost:{PORT}/admin")
        print(f"📍 Sector 14, Old Delhi Road, Gurugram, Haryana - 122001")
        print(f"================================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

if __name__ == "__main__":
    run_server()
