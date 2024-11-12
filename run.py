from app import create_app
import os

skd_app = create_app()

if skd_app is None:
    print("Error: skd_app was not created.")
else:
    print("skd_app created successfully.")
    
# Run with waitress in production
if __name__ == "__main__":
    print("Server running on port 8080")
    from waitress import serve
    try:
        serve(skd_app, host="0.0.0.0", port=os.getenv("PORT"))
    except Exception as e:
        print(f"Error starting waitress: {e}")



# development
# if __name__ == '__main__':
#     skd_app.run(host="0.0.0.0", port=8080)

# # production
# if __name__ == "__main__":
#     from waitress import serve
#     serve(skd_app, host="0.0.0.0", port=8080)