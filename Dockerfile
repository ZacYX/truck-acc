# Step 1: Use an official Node.js image as the base image
FROM node:22-alpine AS builder

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Copy the Prisma schema file explicitly to make it available
COPY prisma ./prisma

# Step 4: Install dependencies --ignore-script: do not run prepare and postinstall
RUN npm install --ignore-scripts  
# RUN npm run prepare && npm run postinstall
RUN  npm run postinstall
RUN npm install -g typescript ts-patch typia 

# Step 5: Copy the rest of the application code to the container
COPY . .

#To set env insider docker container
# COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# ENV RESEND_API_KEY=dummy_key

# Step 6: Build the project
RUN npm run build

# Step 7: Use a smaller base image for the final container
FROM node:22-alpine AS runner

WORKDIR /app

# Step 8: Copy only the necessary files from the builder image
COPY --from=builder /app ./

# Set production environment
ENV NODE_ENV=production

# Step 9: Install production dependencies (optional but recommended)
RUN npm install --only=production 
RUN apk add --no-cache openssl

# Step 10: Expose the port the app will run on
EXPOSE 3000

# Step 11: Start the application
CMD ["npm", "run", "start"]
