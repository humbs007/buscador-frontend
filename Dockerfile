# frontend/Dockerfile
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package.json .
COPY package-lock.json .
COPY ./public ./public
COPY ./src ./src

# Instalar dependências
RUN npm install

# Expor porta padrão React
EXPOSE 3000

# Comando inicial
CMD ["npm", "start"]
