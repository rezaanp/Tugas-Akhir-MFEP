# Gunakan image Node.js sebagai dasar untuk backend
FROM node:18.18.2

# Set direktori kerja di dalam kontainer
WORKDIR /app/backend

# Salin dependensi package.json dan package-lock.json
COPY ./package*.json ./

# Instal dependensi backend
RUN npm install

# Salin sumber kode backend ke dalam kontainer
COPY ./ ./

# Port yang akan digunakan oleh aplikasi Express (jika diperlukan)
EXPOSE 5000

# Perintah yang akan dijalankan saat kontainer backend dijalankan
CMD ["node", "index.js"]