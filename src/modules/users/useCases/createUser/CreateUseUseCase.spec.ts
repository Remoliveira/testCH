import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase"




let createUserUseCase: CreateUserUseCase;
let userRepository: IUsersRepository;

describe("Create User Use Case", () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepository);
  })

  it("should be able to create a user", async () => {

    const user = await createUserUseCase.execute({
      name: "remo",
      email:"test",
      password:"1234"
    });

    expect(user).toHaveProperty("name");
  });

  it("should not be able to create a user if the giver email is already in use", async () =>{
    expect(async () => {
      await createUserUseCase.execute({
        name: "remo",
        email:"test",
        password:"1234"
      });
      await createUserUseCase.execute({
        name: "remo",
        email:"test",
        password:"1234"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  } )


})
