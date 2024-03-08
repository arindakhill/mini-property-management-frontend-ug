FROM node:21-alpine

# Set the working directory
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm","run", "vite build"]
