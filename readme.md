#App

Como rodar a aplicação, tenha o docker instalado na maquina... checar o arquivo .env com login e senha do banco  
comandos:

instale todas as dependencias
> npm install

start o docker (primeiro configure no .env (DATABASE_URL e o docker-compose.yml com root e password da sua preferencia)  
configure também o MY_SECRET_KEY para o JWT  

> docker compose up -d

após subir a imagem do banco de dados (postgres) rode o comando para gerar as tabelas    

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
-[x] Deve Listar pedidos.  
-[x] Deve Atualizar o status de um pedido (ex.: novo, em processamento, enviado, entregue).  


-> ts-node-dev executa o arquivo node em typescript, tsup cria a versão de build transformando o codigo de javascript para typescript



## Endpoints

### Pedido

GET /order        busca todos os pedido
POST /order       criar um novo pedido  
GET /order/:orderId    Busca apenas um pedido  
PUT /order/:orderId    atualiza um pedido pelo id  
DELETE /order/:orderId  apaga um pedido pelo id  

### Produto

GET /product        busca todos os produtos
POST /product       criar um novo produto    
GET /product/:productId    Busca apenas um produto    
PUT /product/:productId    atualiza um produto pelo id  
DELETE /product/:productId  apaga um produto pelo id   

### Status 
PUT /statusProcess/:orderId    atualiza um pedido pelo id para processamento
PUT /statusSent/:orderId    atualiza um pedido pelo id para enviado
PUT /statusDelivered/:orderId    atualiza um pedido pelo id para entregue



### Login (PUBLICO)  

POST /signIn     permite um usuário existe no sistema gerar um token para acessar os endpoints  
POST /user     permite criar um novo usuário  