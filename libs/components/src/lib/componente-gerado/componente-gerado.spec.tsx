import { render } from '@testing-library/react';

import ComponenteGerado from './componente-gerado';

describe('ComponenteGerado', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponenteGerado />);
    expect(baseElement).toBeTruthy();
  });
});
