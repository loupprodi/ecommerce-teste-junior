#App

Como rodar a aplicação, tenha o docker instalado na maquina... checar o arquivo .env com login e senha do banco
comandos:

instale todas as dependencias
> npm install

start o docker (primeiro configure no .env (DATABASE_URL e o docker-compose.yml com root e password da sua preferencia)  
configure também o MY_SECRET_KEY para o JWT  

> docker compose up -d

após subir a imagem do banco de dados (postgres)rode o comando para gerar as tabelas    

> npx prisma migrate dev

start a aplicação  
> npm run dev

## RFs (Requisitos Funcionais)

### Produto
-[x] Deve adicionar um novo produto (Com código, nome, descrição, preço e estoque).  
-[x] Deve listar produtos.  
-[x] Deve buscar informações de um produto pelo codigo.  
-[x] Deve atualizar as informações de um produto pelo código.  
-[x] Deve remover um produto pelo código.  

### Pedidos
-[x] Deve criar um novo pedido.  
-[x] Deve Adicionar, modificar ou remover produtos no pedido.  
-[ ] Deve Listar pedidos.  
-[x] Deve Atualizar o status de um pedido (ex.: novo, em processamento, enviado, entregue).  


-> ts-node-dev executa o arquivo node em typescript, tsup cria a versão de build transformando o codigo de javascript para typescript



## Endpoints

### Pedido

GET /pedidos        busca todos os pedidos, com paginação e filtro, filtro por id 
POST /pedidos       criar um novo pedido  
GET /pedidos/:id    Busca apenas um pedido  
PUT /pedidos/:id    atualiza um pedido pelo id  
DELETE /pedidos/:id  apaga um pedido pelo id  

### Produto

GET /produtos        busca todos os produtos, com paginação e filtro,  filtro por id
POST /produtos       criar um novo produto    
GET /produtos/:id    Busca apenas um produto    
PUT /produtos/:id    atualiza um produto pelo id  
DELETE /produtos/:id  apaga um produto pelo id   

### Login (PUBLICO)  

POST /entrar        permite um usuário existe no sistema gerar um token para acessar os endpoints  
POST /cadastrar     permite criar um novo usuário  