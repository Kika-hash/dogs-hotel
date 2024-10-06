from flask import Flask, request, jsonify
from flask_cors import CORS
from dogs_hotel import db_connection, insert_guest, list_guests, remove_guest

app = Flask(__name__)
CORS(app)


# GET endpoint to display all guests
@app.route("/display_guests", methods=["GET"])
def fetch_guests():
    try:
        guests = list_guests(db_connection())

        if guests is None:
            return jsonify({"error": "No guests found or there was an issue retrieving guests"}), 404

        # Ensure the data is JSON serializable
        guest_list = []
        for guest in guests:
            guest['_id'] = str(guest['_id'])  # Convert ObjectId to string
            guest_list.append(guest)

        return jsonify(guest_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# POST endpoint to create a new guest
@app.route('/add_dog', methods=['POST'])
def add_dog():
    data = request.get_json()

    # Validate required fields
    required_fields = ["dog_name", "owner_name", "breed", "from", "to"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"'{field}' is required."}), 400

    # Establish DB connection and start rest
    result = insert_guest(db_connection(), data)
    return jsonify({"message": "Dog added successfully!", "id": str(result.inserted_id)}), 200

@app.route("/delete_dog", methods=["DELETE"])
def remove_dog():
    try:
        # Extract the 'id' parameter from the request
        dog_id = request.args.get('id')

        if not dog_id:
            return jsonify({"error": "'id' parameter is required"}), 400

        # Convert the id to an ObjectId and attempt to delete the document
        result = remove_guest(db_connection(), dog_id)

        if result.deleted_count == 0:
            return jsonify({"error": "Dog not found"}), 404

        return jsonify({"message": "Dog removed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
