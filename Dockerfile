FROM node:22

# Install Python (Debian-based package)
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    apt-get clean

RUN pip3 install scikit-learn

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 8000

# Run the app
CMD ["npm", "start"]
