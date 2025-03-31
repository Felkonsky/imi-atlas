
FROM python:3.12.4-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /skd-webapp

COPY requirements.txt .

RUN pip3 install --upgrade pip && pip install -r requirements.txt

COPY . .
EXPOSE 8080
CMD ["python", "run.py"]