#!/bin/bash
# Run an install to make sure new Node dependencies since last Docker image build are installed.
npm install
./node_modules/@angular/cli/bin/ng serve --port 80 --host 0.0.0.0 --disable-host-check -c dev
