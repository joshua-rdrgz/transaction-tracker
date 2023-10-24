import fs from 'fs';
import { promisify } from 'util';
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const readFile = promisify(fs.readFile);

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

const customRender = async (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const view = render(ui, { wrapper, ...options });

  const tailwindCSSFile = (await readFile('src/test/index.css')).toString();

  const style = document.createElement('style');
  style.textContent = tailwindCSSFile;
  document.head.appendChild(style);

  return view;
};

export * from '@testing-library/react';
export { customRender as render };
