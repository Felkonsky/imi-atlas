from app import create_app
import os

skd_app = create_app()

if skd_app is None:
    print("Error: skd_app was not created.")
else:
    print("skd_app created successfully.")
    
# Production
if __name__ == "__main__":
    print("Server running on port 8080")
    from waitress import serve
    try:
        serve(skd_app, host="0.0.0.0", port=os.getenv("PORT"), threads=100) 
    except Exception as e:
        print(f"Error starting waitress: {e}")



# # Development
# if __name__ == '__main__':
#     skd_app.run(host="0.0.0.0", port=8080)