import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {expect, test} from 'vitest';
import {Select, SelectTrigger, SelectContent, SelectItem} from '../select';

test('renders SelectTrigger and opens SelectContent on click', () => {
    render(
        <Select>
            <SelectTrigger>Choose option</SelectTrigger>
            <SelectContent>
                <SelectItem value="one">Option One</SelectItem>
                <SelectItem value="two">Option Two</SelectItem>
            </SelectContent>
        </Select>
    );

    // Trigger is rendered
    expect(screen.getByText('Choose option')).toBeInTheDocument();

    // Open the select
    fireEvent.mouseDown(screen.getByText('Choose option'));

    // Content appears
    expect(screen.getByText('Option One')).toBeInTheDocument();
    expect(screen.getByText('Option Two')).toBeInTheDocument();
});