import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule], // Import RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isMenuCollapsed initialized to true', () => {
    expect(component.isMenuCollapsed).toBe(true);
  });

  it('should toggle isMenuCollapsed when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.isMenuCollapsed).toBe(false);

    component.toggleMenu();
    expect(component.isMenuCollapsed).toBe(true);
  });
});
