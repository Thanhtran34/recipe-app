import { LoginComponent } from './login/login.component';
import { routes } from './app-routing.module';
import { HomeComponent } from './home/home.component';

// Integration test for router
describe('#Routes', () => {
  it('should contain a route for /login', () => {
    expect(routes).toContain({ path: 'login', component: LoginComponent });
  });

  it('should contain a route for home', () => {
    expect(routes).toContain({ path: '', component: HomeComponent });
  });
});
