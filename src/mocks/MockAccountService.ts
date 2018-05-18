import { Account } from '../app/models/Account'
/**
 * @author Nicolas GASQUET
 * @description Mocks services
 */
export class MockAccountService {
    private isUserloggedIn: boolean;

    constructor(){
        this.isUserloggedIn = false;
    }

    public connect(login: string, password: string): Account {
        let account = new Account();
        account.login = login;
        account.password = password;

        if (login == null || login ==  "" || password == null  || password == "")
            throw new Error("login/password are not valid");
        else {

            if(account.login == "Nicolas" && account.password == "1234"){
                this.setUserLoggedIn();
                return account;
            }
            else{
                throw new Error("login/password are not valid");
            }
        }
    }
   setUserLoggedIn() {
    this.isUserloggedIn = true;
  }

  getUserLoggedIn(): boolean {
    return this.isUserloggedIn;
  }
}