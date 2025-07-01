import { TestBed } from '@angular/core/testing';
import { ChecklistComponent } from './checklist.component';


describe('Checklist Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ChecklistComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ChecklistComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pollinlink-web');
  });
});
