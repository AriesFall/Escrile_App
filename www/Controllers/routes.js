//Declare environment
const local_server = "https://localhost:44354/api/auth/"                         //Write localhost and port
const public_server = "https://escrileapi.bsite.net/api/auth/"                        //Write WEB API public address
const local_sources = ""       //Write App local resources

const env = local_server                                  //Select your environment (local or public server)

//Login API
const login_route = env + "login"

//Create account API
const createaccount_route = env + "register"

//Crear clase API
const createClass_route = env + "crearClase"

//Unirse a una clase
const joinClass_route = env + "unirseClase"

//Mostrar clases creadas
const showClasses_route = env + "clasesCreadas"

//Mostar clase por id
const showClassWithId_route = env + "clase/"

//Mostrar usuarios
const showUsers_route = env + "users"

//Users API
const allUsers_route = env + "Users"
const postUser_route = env + "Users/"
const loginUser_route = env + "Users/login"
const editProfileFile_route = env + "Users/putProfileFile/"
const signupUser_route = env + "Users/signup"
const dataUser_route = env + "Users/"
const totalUser_route = env + "Users/GetTotalUsers"