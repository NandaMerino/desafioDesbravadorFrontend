import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosdetailsComponent } from './projetosdetails.component';

describe('ProjetosdetailsComponent', () => {
  let component: ProjetosdetailsComponent;
  let fixture: ComponentFixture<ProjetosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
