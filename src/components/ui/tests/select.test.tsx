import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import {expect, describe, it} from 'vitest';
import {Select, SelectTrigger, SelectContent, SelectItem} from '../select';

describe("select ui component", () => {
    it('renders SelectTrigger and opens SelectContent on click', async () => {
        render(
            <Select>
                <SelectTrigger>Choose option</SelectTrigger>
                <SelectContent>
                    <SelectItem value="one">Option One</SelectItem>
                    <SelectItem value="two">Option Two</SelectItem>
                </SelectContent>
            </Select>
        );

        act(() => {
            fireEvent.click(screen.getByText('Choose option')); 
        });

        waitFor(async () => {
            expect(await screen.findByText('Option One')).toBeInTheDocument();
            expect(await screen.findByText('Option Two')).toBeInTheDocument();
        });
    });
});