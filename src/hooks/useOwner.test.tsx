import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useOwner } from './useOwner';
import type { OwnerValues } from '../types';

const initialValues: OwnerValues = {
  name: '',
  email: '',
  phone: '',
};

describe('useOwner', () => {
  beforeEach(() => {
    // Asegurar un estado limpio entre tests
    localStorage.clear();
  });

  it('initial state is correct', () => {
    const { result } = renderHook(() => useOwner(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(false); // name y email vacíos => inválido
  });

  it('handleChange updates values and errors (name)', () => {
    const { result } = renderHook(() => useOwner(initialValues));

    act(() => {
      result.current.handleChange('name', 'Juan');
    });

    expect(result.current.values.name).toBe('Juan');
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.email).toBe('El email es obligatorio.');
  });

  it('handleBlur marks touched and revalidates', () => {
    const { result } = renderHook(() => useOwner(initialValues));

    act(() => {
      result.current.handleBlur('email');
    });
    expect(result.current.touched.email).toBe(true);
    expect(result.current.errors.email).toBe('El email es obligatorio.');
  });

  it('validates email format', () => {
    const { result } = renderHook(() => useOwner(initialValues));
    act(() => {
      result.current.handleChange('email', 'correo_invalido');
    });
    expect(result.current.errors.email).toBe(
      'El email debe tener un formato válido.',
    );

    act(() => {
      result.current.handleChange('email', 'user@example.com');
    });
    expect(result.current.errors.email).toBeUndefined();
  });

  it('validates phone: digits only and max 9', () => {
    const { result } = renderHook(() => useOwner(initialValues));
    expect(result.current.errors.phone).toBeUndefined();
    act(() => {
      result.current.handleChange('phone', '123a');
    });
    expect(result.current.errors.phone).toBe(
      'El teléfono solo puede contener números.',
    );

    act(() => {
      result.current.handleChange('phone', '1234567890');
    });
    expect(result.current.errors.phone).toBe(
      'El teléfono debe tener como máximo 9 dígitos.',
    );

    act(() => {
      result.current.handleChange('phone', '123456789');
    });
    expect(result.current.errors.phone).toBeUndefined();
  });

  it('isValid is true when name and email are valid and phone is valid/optional', () => {
    const { result } = renderHook(() => useOwner(initialValues));

    act(() => {
      result.current.handleChange('name', 'Maria');
      result.current.handleChange('email', 'maria@example.com');
      result.current.handleChange('phone', '');
    });
    waitFor(() => {
      expect(result.current.errors).toEqual({});
      expect(result.current.isValid).toBe(true);
    });
  });
});
