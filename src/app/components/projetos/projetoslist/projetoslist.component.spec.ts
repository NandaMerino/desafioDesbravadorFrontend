import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoslistComponent } from './projetoslist.component';

describe('ProjetoslistComponent', () => {
  let component: ProjetoslistComponent;
  let fixture: ComponentFixture<ProjetoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
