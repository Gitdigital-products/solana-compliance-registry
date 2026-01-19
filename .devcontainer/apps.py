from flask import Flask

app = Flask(__name__)

@app.post("/python/device-sync")
def sync():
    return "Python backend synced nano‑devices", 200
