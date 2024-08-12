from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get('email')
    password = body.get('password')

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200
