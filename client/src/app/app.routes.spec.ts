import { LoginComponent } from './login/login.component';
import { routes } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

// Integration test for router
describe('#Routes', () => {
  it('should contain a route for /login', () => {
    expect(routes).toContain({ path: 'login', component: LoginComponent });
  });

  it('should contain a route for home', () => {
    expect(routes).toContain({ path: '', component: HomeComponent });
  });

  it('should contain a route for instruction', () => {
    expect(routes).toContain({ path: 'instruction', component: FooterComponent });
  });
});
