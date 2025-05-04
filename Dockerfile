FROM node:22

# Install Python, pip, and venv
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install scikit-learn

# Make sure Python and pip from the venv are used
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy package files and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose app port
EXPOSE 8000

# Start your Node.js app
CMD ["npm", "start"]
