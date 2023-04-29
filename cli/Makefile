install:
	cd cli

	pip3 install -U pyinstaller

	pip3 install -r requirements.txt

	pyinstaller --onefile src/moo.py

	mv dist/moo ~/.local/bin/moo
