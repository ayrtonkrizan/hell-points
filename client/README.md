# Lodetti e-commerce

Ecommerce do supermercado lodetti. Desenvolvido por Ayrton Krizan.

# Estrutura de pastas (src)

## components
Componentes que podem ser reaproveitados em qualquer parte do código;

## contexts
Configuração de todos os contextos utilizados; 
#### AppContext
Controle de estado geral da aplicação
* signed
* closedMenu
* handleSignin
* handleSignout
#### ToastContext
Controle da stack de Toast;
* success;
* warn;
* error;
* info;

## firebase-folder
Controle de metódos que integram com o firebase-sdk;
#### Auth
* signin
* signup
* resetPassword
* signout
#### DB
Controle de schemas e funções
##### TODO -> Documentar metodos

## hooks
Hooks customizados do sistema
#### useModal
* isOpen
* openModal
* closeModal

#### useQueryParams
Leitura dos parametros passados por URL
* queryParams -> Objeto com os parametros;
* search -> URLParams;

## pages
Paginas que podem ser acessados por menu ou URL;
a estrutura padrão dos arquivos dentro de cada página é:

    ├── index.js                # Página final;
    ├── styles.js               # CSS feito com `styled-components`;
    ├── list.js                 # Lista de items (`opcional`)
    ├── card.js                 # Card (`opcional`)
    ├── form.js                 # Controle de CRUD (`opcional`)

## routes
Configurações do `react-router-dom`.

    ├── index.js                # Lógica de negócio (verificação de acesso, redirects, etc...);
    ├── routes.js               # JSON com Rotas do sistema e pagina a ser renderizada;

## services
Outros métodos do sistema

    ├── api.js                  # Inicialização de AXIOS e config de rotas;
    ├── helpers.js              # Funções javascript para facilitar o desenvolvimento;
    ├── constants.js            # Contantes do sistema;
    ├── currencies.js           # JSON com todas as moedas do mundo;