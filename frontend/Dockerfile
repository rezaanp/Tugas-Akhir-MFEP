# Gunakan image Node.js sebagai dasar
FROM node:18.18.2

# Set direktori kerja di dalam kontainer
WORKDIR /app/frontend

# Salin dependensi package.json dan package-lock.json
COPY ./package*.json ./

# Instal dependensi
RUN npm install

# Salin sumber kode frontend ke dalam kontainer
COPY ./ ./

# Build proyek React
RUN npm run build

# Port yang akan digunakan oleh aplikasi React (jika diperlukan)
EXPOSE 80

# Perintah yang akan dijalankan saat kontainer dijalankan
CMD ["npm", "start"]