<div>
<h1>
<img src = "https://user-images.githubusercontent.com/102265620/220200532-5fa4a52f-6be4-43c8-8214-d0eabbc68d8c.png" /img>
Projeto - Jemison - Coockenu 03  <img src ="https://user-images.githubusercontent.com/102265620/220200026-f6641029-9ac6-4a6c-ba25-4232984f9e20.png"/img>
</div>
</h1>
<hr>
<h4>
:plate_with_cutlery: O projeto Cookenu, tem como principal objetivo, reforçar o que foi aprendido de backend ao longo do curso.:pancakes:
</h4>
<h4>
Utilizando uma arquitetura em três camadas(Data, Controller e Business), como os conceitos de Herança, Arquitetura limpa, Criptografia e principalmente reforçando ainda mais o conceito de Programação Orientada a Objeto, com criação de classes para todas as funções e na maioria das DTOs utilizadas no projeto e também aprofundando o conceito de autenticação inserindo a parte de Role da conta, onde no caso existe um tipo de conta Normal com funções restritas e uma Administrador.
</h4>
<h4>
O projeto simula uma rede social de receitas contendo as entidades, Usuários:man_cook:, Receitas:meat_on_bone: e Seguidores:family_man_girl_girl:, composta pelas ações mais comuns em redes sociais, como criar um usuário, criar uma receita, verificar uma receita postada, seguir um usuário e receber um feed com as receitas postadas por todos os usuários seguidos, verificar o profile, atualizar posts e até deletar contas.
</h4>

<hr>

<div>
<h3>
<img src ="https://user-images.githubusercontent.com/102265620/220210264-5210a108-b18a-42e4-9c79-e7b7bfd2c02d.png" /img>
 Integrantes do grupo:
 <img src = "https://user-images.githubusercontent.com/102265620/220205822-d06a3346-a204-4e35-8838-ed3d22ad8f8b.png"/img>


 </h3>
 
* Leonardo Mizuki Koga
* Renato Alexandrini
* Rhuan Victor Virtudes Lourenço
---
</div>


<h3>
<img src ="https://user-images.githubusercontent.com/102265620/220208927-bf649bf7-8434-40de-800b-59d1764d7f93.png" /img>
Como Utilizar o Projeto:
<img src = "https://user-images.githubusercontent.com/102265620/220210337-54329eef-2d6f-41e1-a6fa-c419d00af59f.png"/img>
</h3>

~~~
- git clone https://github.com/future4code/Jemison-cookenu3 
- npm install
- npm run migrations
- npm run start
~~~

---

<h2>
<img src ="https://user-images.githubusercontent.com/102265620/220210720-83874ff1-9218-4e5e-94f5-279dbba6b73c.png"/img>
Endpoinst do projeto
<img src ="https://user-images.githubusercontent.com/102265620/220211624-cb6b3206-a036-42ee-941f-881481bffce2.png"/img>
</h2>

---


:yellow_circle: Criar um Usuário/SignUp :man_cook:
>  Este Endpoint cria um novo usuário a partir dos dados recebidos através do "body".
>
> O nome não possui nenhuma restrição
>
> O email passa por duas verificações, primeiramente é verificado se o dado possúi formato padrão de email com "nome@conta.com" e então é verificado se o email já foi > cadastrado anteriormente.
>
> A senha precisa conter no mínimo 8 caracteres, entre eles deve existir pelo menos uma letra maiúscula, uma minúscula, um número e um caracter especial(!@#$%).
>
> A "Role" da conta, precisa ser uma opção entre admin ou normal, sendo que, no caso de não ser adicionada nenhuma role, por padrão a conta é criada como normal.
>
> O retorno deste endpoint é composto por: uma mensagem de sucesso, as informações do usuário criado, para facilitar a visualização e o token de validação, que será utilizado no restante dos endpoints.

</br>



### Tecnologia Utilizada:
* Typescript

<img src="https://user-images.githubusercontent.com/102265620/205476749-786b35ae-cb86-44ab-bff9-4bd8833284b7.png" width="50px">

* SQL

<img src="https://user-images.githubusercontent.com/102265620/205476861-68520703-8f8b-4dc9-9336-fc7d8b4a0764.jpg" width="50px">

### Link da Documentação via Postman
https://documenter.getpostman.com/view/24755055/2s8Z75Spvm

### Link do Deploy através do Render
https://jemison-labesystem1.onrender.com

