# Projeto Fórum


## Introdução
Este projeto trata-se de um fórum com perguntas e respostas. Ele foi construído em uma arquitetura de três camadas, usando de dois objetos de computação: Serviço de Frontend( React) e Serviço de Backend(Java).

### 1.Frontend: 
Desenvolvido em React, lib de js para criação de  aplicações de interface com o usuário. 
Conceitos e práticas usadas:
-Separação Componente Funcional (burro, stateless) x Componente de Classe (smart, statefull)
-Testes unitários com Jest, Enzyme e React Testing Library;
-Css modules: modularização dos estilos;
-Atualização de estados de maneira pura/imutável;
-Utilização de LocalStorage para salvar dados da seção do usuário;
-Utilização do ContextApi para salvar estados globais;
-Chamadas rest usando Axios;

### 2.Backend:
Desenvolvido em Java 11;
Conceitos e práticas usadas:
-Arquitetura em Camadas: Uso do Repository Pattern, para camada de acesso de dados e Service para a camada de domínio (regras de negócio);
-Testes unitários com JUNIT e mockito;
-Métodos e parâmetros imutáveis;
-Naming conventions para facilitar a leitura;

### 3.Banco de dados:
Foi usado o MongoDB;

### 4.Docker:
O projeto foi criado para ser conteinerizado e, assim, seguir o conceito de iteroprabilidade mencionado por Nadareishivili et al., 2016 (Microservice Architecture: Aligning principles, practices, and culture), cuja finalidade é produzir um artefato capaz de ser executado em qualquer ambiente (que possua o Docker instalado). 


## Instalação

Não é necessário instalar nada além do Docker e docker-compose cli.

Docker:```https://docs.docker.com/engine/install/```

Docker Compose: ```https://docs.docker.com/compose/install/```

Após a instalação, executar o comando a seguir na raiz da pasta do projeto:

```bash
docker-compose up --build
```
Aguarde, pode demorar alguns minutos para construir as imagens.


## Uso
A aplicação inicializará na porta 3000 (localhost:3000).

É possível também acessar o Swagger, com a documentação do backend na url: 
```
localhost:8080/swagger-ui.html
```
