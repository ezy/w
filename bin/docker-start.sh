#!/bin/bash
docker build -t ezy/weta-api .
docker run -p 3000:3000 -d ezy/weta-api