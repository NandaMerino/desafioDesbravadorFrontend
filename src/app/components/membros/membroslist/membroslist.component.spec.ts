import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroslistComponent } from './membroslist.component';

describe('MembroslistComponent', () => {
  let component: MembroslistComponent;
  let fixture: ComponentFixture<MembroslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembroslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembroslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
