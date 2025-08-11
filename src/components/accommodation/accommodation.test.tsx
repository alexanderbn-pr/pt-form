import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Accommodation from './accommodation';
import { TYPE_OPTIONS } from '../../constants';
import type { Photo } from '../../types';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('Accommodation component tests', () => {
  const handleSubmit = vi.fn();
  const handleChange = vi.fn();
  const setType = vi.fn();
  const handleBlur = vi.fn();
  const handleAddPhotos = vi.fn();
  const baseProps = {
    handleSubmit: handleSubmit,
    values: { name: '', address: '', description: '', type: '' },
    errors: {},
    touched: {},
    handleChange: handleChange,
    handleBlur: handleBlur,
    isValid: false,
    type: '',
    setType: setType,
    handleAddPhotos: handleAddPhotos,
    photos: [],
  };

  it('renders the form and main elements', async () => {
    render(<Accommodation {...baseProps} />);

    expect(
      screen.getByRole('heading', { name: /Accommodation/i }),
    ).toBeDefined();
    expect(screen.getByText(/Name \*/i)).toBeDefined();
    expect(screen.getByText(/Address \*/i)).toBeDefined();
    expect(screen.getByText(/Description/i)).toBeDefined();
    expect(screen.getByText(/Type \*/i)).toBeDefined();
    expect(screen.getByText(/Photos/i)).toBeDefined();
    expect(screen.getByText(/Add Photo/i)).toBeDefined();

    expect(screen.getByRole('combobox')).toBeDefined();

    const nextBtn = screen.getByRole('button', { name: /Next/i });
    expect(nextBtn).toBeDisabled();
  });

  it('enables the button and submits with the correct step', async () => {
    render(
      <Accommodation
        {...baseProps}
        isValid={true}
        values={{
          name: 'John',
          address: 'Main St',
          description: '',
          type: TYPE_OPTIONS[0].value,
        }}
        type={TYPE_OPTIONS[0].value}
      />,
    );

    const nextBtn = screen.getByRole('button', { name: /Next/i });
    expect(nextBtn).toBeEnabled();

    await userEvent.click(nextBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('handles change and blur on text inputs', async () => {
    render(<Accommodation {...baseProps} />);

    const inputName = screen.getByRole('textbox', { name: /Name \*/i });

    await userEvent.click(inputName);
    fireEvent.change(inputName, { target: { value: 'My Name' } });
    expect(handleChange).toHaveBeenLastCalledWith('name', 'My Name');

    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalledWith('name');
  });

  it('displays errors when they exist and are touched', async () => {
    render(
      <Accommodation
        {...baseProps}
        errors={{ name: 'Nombre requerido' }}
        touched={{ name: true }}
      />,
    );

    expect(screen.getByText('Nombre requerido')).toBeDefined();
  });

  it('selects the type and triggers blur on the select', async () => {
    render(<Accommodation {...baseProps} type={TYPE_OPTIONS[0].value} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    await userEvent.selectOptions(select, TYPE_OPTIONS[0].value);
    expect(setType).toHaveBeenCalledWith(TYPE_OPTIONS[0].value);

    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalledWith('type');
  });

  it('hides the add button when MAX_PHOTOS is reached', async () => {
    const filledPhotos: Photo[] = [
      {
        id: 1,
        url: `photo-1.png`,
      },
      {
        id: 2,
        url: `photo-2.png`,
      },
    ];
    render(<Accommodation {...baseProps} photos={filledPhotos} />);

    expect(screen.queryByText(/Add Photo/i)).toBeNull();
  });

  it('shows the add button when there are fewer than MAX_PHOTOS', async () => {
    const somePhotos: Photo[] = [
      {
        id: 1,
        url: 'photo-1.png',
      },
    ];
    render(<Accommodation {...baseProps} photos={somePhotos} />);

    const fileInput = screen.getByLabelText('Add Photo') as HTMLInputElement;
    expect(fileInput).toBeDefined();
    expect(fileInput.type).toBe('file');
  });
});
