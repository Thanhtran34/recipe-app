import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterLinkWithHref } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { By } from '@angular/platform-browser';

describe('#HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'instruction', component: FooterComponent }
      ])
      ],
      providers: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Integration test for navigation and router link

  it('should have a link to /instruction', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties.href === '/instruction';
    });
    expect(index).toBeGreaterThan(-1);
  });
});
