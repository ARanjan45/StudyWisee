from flask import Flask, request, jsonify
from flask_cors import CORS 
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Mock average PPT upload limit (common size limit)
AVERAGE_PPT_LIMIT_MB = 10

# In-memory user session (can be enhanced later)
user_sessions = {}

responses = {
    "greeting": "Hello! I'm StudyBot. What's your name?",
    "ask_query": "Nice to meet you, {name}! What is your query?",
    "ppt_issue": f"The average PPT size should be less than {AVERAGE_PPT_LIMIT_MB}MB on most websites.",
    "ask_subject": "What subject are you looking YouTube recommendations for?",
    "ask_topic": "Which topic in {subject}?",
    "youtube_link": {
        "Mathematics": {
            "Trignometry": "https://www.youtube.com/watch?v=M8tohTzRsFk&list=PLXTyt_wUBqQ73WsxUP7p03Mo8h5pQISrw"
        }
    },
    "fallback": "I'm not sure about that. Could you rephrase your question?"
}

@app.route("/start", methods=["GET"])
def start():
    return jsonify({"response": responses["greeting"]})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_id = data.get("user_id", "default")  # Use session or frontend ID ideally
    message = data.get("message", "").strip().lower()

    session = user_sessions.get(user_id, {"stage": "greet", "name": "", "subject": "", "topic": ""})

    # STAGE 1: Greeting (Ask for name)
    if session["stage"] == "greet":
        session["name"] = message.title()
        session["stage"] = "ask_query"
        user_sessions[user_id] = session
        return jsonify({"response": responses["ask_query"].format(name=session["name"])})

    # STAGE 2: Ask query
    elif session["stage"] == "ask_query":
        if "ppt" in message and "upload" in message:
            response = responses["ppt_issue"]
        elif "youtube" in message and "recommendation" in message:
            session["stage"] = "ask_subject"
            response = responses["ask_subject"]
        else:
            response = responses["fallback"]
        user_sessions[user_id] = session
        return jsonify({"response": response})

    # STAGE 3: Ask subject for YouTube
    elif session["stage"] == "ask_subject":
        session["subject"] = message.title()
        session["stage"] = "ask_topic"
        user_sessions[user_id] = session
        return jsonify({"response": responses["ask_topic"].format(subject=session["subject"])})

    # STAGE 4: Ask topic for YouTube
    elif session["stage"] == "ask_topic":
        session["topic"] = message.title()
        subject = session["subject"]
        topic = session["topic"]
        link = responses["youtube_link"].get(subject, {}).get(topic)

        if link:
            response = f"Here's a useful YouTube video on {topic}: {link}"
        else:
            response = "Sorry, I couldn't find a video for that topic."

        session["stage"] = "ask_query"  # Reset for next query
        user_sessions[user_id] = session
        return jsonify({"response": response})

    else:
        return jsonify({"response": responses["fallback"]})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
