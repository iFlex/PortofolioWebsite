import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ProjectsModule } from './projects.module';

export function main() {
  describe('projects component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ProjectsModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          const projectsDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(projectsDOMEl.querySelectorAll('h2')[0].textContent).toEqual(
            'Features'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-projects></sd-projects>'
})
class TestComponent {}
