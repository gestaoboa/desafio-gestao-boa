<div align="center">  
  <img src="https://www.gestaoboa.com.br/beasier-1-1-1@2x.png" alt="logo" style="width:120px"></img>
</div>

# Desafio Gestão Boa

### Para Começar

  * Realize uma **fork** desse repositório no seu github pessoal
  * Clone o **seu repositório** e desenvolva-o localmente **um** dos desafios abaixo
  * Ao terminar siga as instruções descritas na seção **[Entrega](https://github.com/BEasier-Tech/desafio-gestao-boa#entrega)**
   

### Frontend

##### Descrição

  Desenvolva uma aplicação utilizando React Native e Expo que consuma a API de personagens do [Rick And Morty](https://rickandmortyapi.com/)
  **Obs**:Desenvolver uma interface amigável, e responsiva em diversos tamanhos de celular, **é um grande diferencial!**
  
##### Requisitos

  * Ao iniciar a aplicação, liste todos os itens que foram adicionados no storage.
  * Faça um get de todas informações dessa lista, e adicione localmente no storage do celular.
  * Possibilite editar, excluir e criar itens nessa lista.
  * Possibilite ordenar por nome, e filtrar por "Alive" ou "Death".

### Backend

#### Descrição

  Desenvolva uma REST API simples utilizando Go e o framework [Gin](https://github.com/gin-gonic/gin)

##### Requisitos
  * A API deverá consumir um banco de dados PostgreSQL(localmente)
    * O banco deverá conter a tabela **personagem**
    * definida pelo seguinte schema


          CREATE TABLE personagem (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            status VARCHAR(50) CHECK (status IN ('Alive', 'Dead', 'unknown')) NOT NULL,
            species VARCHAR(255) NOT NULL,
            type VARCHAR(255),
            gender VARCHAR(50) CHECK (gender IN ('Female', 'Male', 'Genderless', 'unknown')) NOT NULL,
            image VARCHAR(500) NOT NULL,
            url VARCHAR(500) NOT NULL,
            created TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
      * Inicialmente popule o banco de dados utilizando a API de personagens do [Rick and Morty](https://rickandmortyapi.com)
        
    * Desenvolva os seguintes endpoints
      * POST /personagens
        * Endpoit para registrar um personagem
          
          * Body
            
                {
                    "name": "string",
                    "status": "string",
                    "species": "string",
                    "type": "string" | null,
                    "gender": "string",
                    "image": "string",
                    "url": "string"
                }
      
      * PUT /personagens/:personagem_id
        * Endpoint para atualizar as informações de um personagem. Enviar no payload apenas as informações que serão atualizadas
          * Body

  
                {
                    "name": "string" | null,
                    "status": "string" | null,
                    "species": "string" | null,
                    "type": "string" | null,
                    "gender": "string" | null,
                    "image": "string" | null,
                    "url": "string" | null
                }
            
      * GET /personagens
        * Endpoint para listagem dos personagens
          * Deverá retornar os dados paginados
          * Poderá retornar personagens filtrados pelo campo **"status"** da tabela **"personagem"**
          * Poderá retornar os personagens ordernados por nome (A-Z ou Z-A)
            
      * GET /personagens/:personagem_id
        * Endpoint para retornar informações de um personagem especifico pelo **id**
    

### Obs:
Para nós o mais importante não é o projeto estar 100% funcional, e bonito, e sim você conseguir cumprir o prazo, e ter tido uma grande curva de aprendizagem, boa sorte a todos!

### Entrega
* Ao terminar verifique novamente se a solução cumpre alguns dos requisitos
* Adicione um arquivo README.md explicando como rodar o seu projeto
* Entre em contato com o Silvio ou Victor

### Em caso de dúvidas entre em contato pelo zap (Victor ou Silvio)
