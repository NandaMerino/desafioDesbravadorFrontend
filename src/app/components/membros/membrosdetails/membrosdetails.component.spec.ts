import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosdetailsComponent } from './membrosdetails.component';

describe('MembrosdetailsComponent', () => {
  let component: MembrosdetailsComponent;
  let fixture: ComponentFixture<MembrosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembrosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembrosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
