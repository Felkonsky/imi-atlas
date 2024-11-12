from app import create_app

skd_app = create_app()

# development
if __name__ == '__main__':
    skd_app.run(host="0.0.0.0", debug=True, port=8080)

# production
# if __name__ == "__main__":
#     from waitress import serve
#     serve(app, host="0.0.0.0", port=8080)ç