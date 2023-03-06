<div>
<h1>
<img src = "https://user-images.githubusercontent.com/102265620/220200532-5fa4a52f-6be4-43c8-8214-d0eabbc68d8c.png" align="center" /img>
Projeto - Jemison - Coockenu 03  <img src ="https://user-images.githubusercontent.com/102265620/220200026-f6641029-9ac6-4a6c-ba25-4232984f9e20.png" align="center"/img>
</div>
</h1>
<hr>
<h4>
:plate_with_cutlery: O projeto Cookenu, tem como principal objetivo, reforçar o que foi aprendido sobre o conteúdo de Backend, ao longo do curso da Labenu:pancakes:.
</h4>
<h4>
Utilizando uma arquitetura em três camadas(Data, Controller e Business), os conceitos de Herança, Arquitetura limpa, Criptografia e principalmente reforçando ainda mais o conceito de Programação Orientada a Objeto, com criação de classes para todas as funções e na maioria das DTOs utilizadas no projeto, também aprofundando o conceito de autenticação inserindo a parte de Role da conta, onde no caso, existe um tipo de conta Normal com funções restritas e uma conta de Administrador.
</h4>
<h4>
O projeto simula uma rede social de receitas contendo as entidades, Usuários:man_cook:, Receitas:meat_on_bone: e Seguidores:twisted_rightwards_arrows:, composta pelas ações mais comuns em redes sociais, como criar um usuário, criar uma receita, verificar uma receita postada, seguir um usuário, receber um feed com as receitas postadas por todos os usuários seguidos, verificar o profile, atualizar posts e até deletar contas.
</h4>

<hr>

<div>
<h3>
<img src ="https://user-images.githubusercontent.com/102265620/220210264-5210a108-b18a-42e4-9c79-e7b7bfd2c02d.png" align="center" /img>
 Integrantes do grupo:
 <img src = "https://user-images.githubusercontent.com/102265620/220205822-d06a3346-a204-4e35-8838-ed3d22ad8f8b.png"align="center" /img>
 </h3>
 
* Leonardo Mizuki Koga
* Renato Alexandrini
* Rhuan Victor Virtudes Lourenço
---
</div>


<h3>
<img src ="https://user-images.githubusercontent.com/102265620/220208927-bf649bf7-8434-40de-800b-59d1764d7f93.png" align="center" /img>
Como Utilizar o Projeto:
<img src = "https://user-images.githubusercontent.com/102265620/220210337-54329eef-2d6f-41e1-a6fa-c419d00af59f.png" align="center" /img>
</h3>

~~~
- git clone https://github.com/future4code/Jemison-cookenu3 
- npm install
- npm run migrations
- npm run start
~~~

---

<h2>
<img src ="https://user-images.githubusercontent.com/102265620/220210720-83874ff1-9218-4e5e-94f5-279dbba6b73c.png"align="center" /img>
Endpoinst do projeto
<img src ="https://user-images.githubusercontent.com/102265620/220211624-cb6b3206-a036-42ee-941f-881481bffce2.png" align="center" /img>
</h2>

---


:yellow_circle: **Criar um Usuário/SignUp** :man_cook:
>  Este Endpoint cria um novo usuário a partir dos dados recebidos através do "body".
>
> O nome não possui nenhuma restrição
>
> O email passa por duas verificações, primeiramente é verificado se o dado possúi formato padrão de email com "nome@conta.com" e então é verificado se o email já foi cadastrado anteriormente.
>
> A senha precisa conter no mínimo 8 caracteres, entre eles deve existir pelo menos uma letra maiúscula, uma minúscula, um número e um caracter especial(!@#$%).
>
> A "Role" da conta, precisa ser uma opção entre admin ou normal, sendo que, no caso de não ser adicionada nenhuma role, por padrão a conta é criada como normal.
>
> O retorno deste endpoint é composto por: uma mensagem de sucesso, as informações do usuário criado, para facilitar a visualização e o token de validação, que será utilizado no restante dos endpoints.

</br>

:yellow_circle: **Login** :man_cook:
> Este endpoint cria um token de autenticação através de um email e uma senha recebidos através do "body".
>
> Primeiramente é feita uma verificação para saber se o email existe no banco de dados e então uma verificação para saber se a senha combina com a criada pelo usuário.
>
> O retorno deste endpojnt é apenas o token de autenticação que deverá ser utilizado no restante dos endpoints.
</br>

:green_circle: **Buscar o perfil do Usuário** :man_cook:
> Este endpoint retorna o perfil do usuário que está logado no momento, portanto ele precisa apenas do token de autenticação do usuário passado através do "headers"
>
> O retorno deste endpoint são os dados da conta do usuário sem a senha.
</br>

:green_circle: **Buscar o perfil de outors Usuários** :man_cook:
> Este endpoint retorna o profile de qualquer outro usuário, onde o ID deste usuário deverá ser recebido através do "params"
>
> É obrigatório o envio de um ID e não é possível receber o perfil do próprio usuário que esta validado através do token.
>
> O retorno deste endpoint são as informações da conta de um usuário, sem a senha.
</br>

:yellow_circle: **Criar um Post de Receita** :meat_on_bone:
> Este endpoint cria uma nova receita tendo o usuário autenticado como autor.
>
> Ele recebe um token de autenticação através do "headers" e deverá receber o restante dos dados através do "body"
>
> Um título, que será verificado se já existe uma receita com o mesmo nome
>
> E um Modo de preparo, que não possuí nenhum tipo de restição.
>
> O retorno deste endpoint é composto por uma mensagem de sucesso e os dados da receita para facilitar a vizualização.
</br>

:green_circle: **Buscar um Post de Receita** :meat_on_bone:
> Este endpoint retorna os dados de uma receita, onde o ID deverá ser recebido através do "params" e um token de autenticação deverá ser recebido através do "headers"
>
> Este endpoint retorna os dados da receita junto com o nome o ID do autor da receita.
</br>

:large_blue_circle: **Atualizar um Post de Receita** :meat_on_bone:
> Este endpoint atualiza os dados de uma receita, sendo necessários para essa alteração:
>
> Um token de autenticação que deverá ser recebido através do "headers"
>
> O ID de uma receita que deverá ser recebido através do "params"
>
> Um novo título para a receita e/ou um novo modo de preparo para a receita, recebidos através do "body".
> Sendo obrigatório pelo menos uma, entre esseas duas opções e no caso do novo título, mesmo se houver apenas ele para atualizar ou ele estiver junto com uma nova descrição, ele passará por uma verificação se há uma receita com mesmo nome.
>
> As contas de Administrador, podem alterar qualquer receita, enquanto as contas Normais, podem alterar apenas as receitas de própria autoria.
>
> O retorno deste endpoint é composto por uma mensagem contendo a descriçao de tudo que foi alterado.
</br>

:red_circle: **Deletar um Post de Receita** :meat_on_bone:
> Este endpoint deleta uma receita recebendo seu ID através do "params"
>
> Uma conta de Administrador, poderá deletar qualquer receita, enquanto uma conta Normal só poderá deletar uma receita de autoria própria.
>
> O retorno deste endpoint é uma mensagem indicando o nome da receita deletada.
</br>

:green_circle: **Buscar o Feed de um usuário** :man_cook::meat_on_bone:
> Este endpoint utiliza o ID retirado do token de autenticação, recebido através do "headers", para criar um feed com as receitas postados pelos usuários que a conta segue, ordenado por ordem de criação das receita.
</br>

:yellow_circle: **Seguir um usuário** :twisted_rightwards_arrows:
> Este endpoint cria uma relação de seguir um outro usuário.
>
> Recebendo através do "headers" um token de autenticação, de onde será retirado o ID do usuário.
>
> E também o ID do usuário a ser seguido, recebido através do "body", onde serão feitas as verificação:
>
> Se existe um usuário com este ID,
>
> Se o ID recebido pelo "body" não é igual ao ID retirado do token
>
> E se a conta já segue o usuário da solicitação.
>
> este endpoint retorna uma mensagem de sucesso com a relação criada para facilitar a vizualização.
</br>

:red_circle: **Deixar de seguir um usuário** :twisted_rightwards_arrows:
> Este endpoint deleta uma relação de seguir um outro usuário.
>
> Recebendo através do "headers" um token de autenticação, de onde será retirado o ID do usuário.
>
> E também o ID do usuário que deseja deixar de seguir, recebido através do "body", onde serão feitas as verificação:
>
> Se existe um usuário com este ID,
>
> Se o ID recebido pelo "body" não é igual ao ID retirado do token
>
> E se a conta realmente segue o usuário da solicitação.
>
> este endpoint retorna uma mensagem de sucesso da remoção desta relação.
</br>

:red_circle: **Deletar uma conta** :man_cook: 
>Este endpoint deleta a conta de um usuário e todas as relações que ele possui no banco de dados.
>
> Ele deve receber um token de autenticação através do "headers" e o ID do usuário a ter a conta deletada, através do "params", então haverá uma verificação se o usuário existe no banco de dados.
>
> Uma conta Administradora, poderá deletar qualquer outra conta de usuário, enqunato uma conta Normal poderá apenas excluir sua própria conta.
>
>Este endpoint retorna uma mensagem de sucesso da remoção da conta com o nome e o ID da conta deletada, para facilitar a vizualização.
</br>

:yellow_circle: **Esqueci minha senha** :man_cook::question:
>Este endpoint para funcionar corretamente, deveria enviar um link com uma página feita em frontend que levaria ao endpoint de trocar a senha do usuário, sem precisar de nenhum tipo de autenticação, desta forma, ao usuário entrar na conta de email enviada, estaria provando que a conta realmente é sua e poderia trocar a senha.
>
> Porém para conseguirmos testar este endpoint, a senha é trocada automaticamente e enviada para o email recebido através do "body".
>
> Desta forma é possível ao menos testar este recurso do Projeto, porém não seria funcional em um ambiente real, tendo em vista que qualquer usuário conseguiria trocar a senha de outro usuário apenas sabendo o email cadastrado. Mesmo não tendo acesso ao email, poderia gerar trocas de senhas sem a solicitação do próprio dono da conta.
>
>Este endpoint retorna uma mensagem confirmando o envio do email e a partir deste momento, o usuário precisa entrar em seu email e pegar a nova senha para realizar o login.
</br>

---
<h2>
<img src = "https://user-images.githubusercontent.com/102265620/220228725-e44761c5-c8bd-475c-bbf6-fcbead1e3649.png" align="center" /img>
Tecnologias Utilizadas:
<img src = "https://user-images.githubusercontent.com/102265620/220228789-bba29176-ac68-4ea1-a234-a775faa9b12b.png" align="center" /img>
</h2>
<h3>

* ***Typescript***  <img src="https://user-images.githubusercontent.com/102265620/205476749-786b35ae-cb86-44ab-bff9-4bd8833284b7.png" align="center" width="40px">

* ***SQL***   <img src="https://user-images.githubusercontent.com/102265620/205476861-68520703-8f8b-4dc9-9336-fc7d8b4a0764.jpg" align="center" width="40px">
</h3>

### Link da Documentação via Postman <img src="https://user-images.githubusercontent.com/102265620/220229621-6378210c-7af7-4102-934e-d140b690a055.png" align="center" width="30px">
https://documenter.getpostman.com/view/24755055/2s93CHuFMw

### Link do Deploy através do Render <img src="https://user-images.githubusercontent.com/102265620/220230248-76c860ff-7235-4935-ade2-48a461851b62.png" align="center" width="30px">
https://projeto-jemison-cookenu3.onrender.com

