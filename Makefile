run: server.py
	 GOOGLE_APPLICATION_CREDENTIALS="$(< credentials.json)" gunicorn app:app