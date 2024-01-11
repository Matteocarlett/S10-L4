import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Main rendering tests', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('renders Welcome', () => {
        expect(screen.getByRole('heading', { name: /benvenuti in epibooks!/i })).toBeInTheDocument();
    });

    it('renders all the books', () => {
        expect(screen.getAllByTestId('book-card')).toHaveLength(150);
    });

    it('renders CommentArea', () => {
        expect(screen.getByPlaceholderText(/inserisci qui il testo/i)).toBeInTheDocument();
    });
});

describe('Filter testing', () => {
    beforeEach(() => {
        render(<App />);
    });

    it("finds one result for 'thrones' ", () => {
        const filterInputField = screen.getByPlaceholderText(/cerca un libro/i);
        fireEvent.change(filterInputField, { target: { value: 'thrones' } });
        expect(screen.getAllByTestId('book-card')).toHaveLength(1);
    });

    it("finds three books called 'king'", () => {
        const filterInputField = screen.getByPlaceholderText(/cerca un libro/i);
        fireEvent.change(filterInputField, { target: { value: 'king' } });
        expect(screen.getAllByTestId('book-card')).toHaveLength(9);
    });
});

describe('SingleBook test', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('changes border', () => {
        const [firstBookCard, secondBookCard] = screen.getAllByTestId('book-card');
        fireEvent.click(firstBookCard);
        expect(firstBookCard).toHaveStyle('border: 3px solid red');

        fireEvent.click(secondBookCard);
        expect(firstBookCard).not.toHaveStyle('border: 3px solid red');
    });
});

describe('CommentList board', () => {
    beforeEach(() => {
        render(<App />);
    });

    it("no SingleComment if book isn't cliccked", () => {
        expect(screen.queryAllByTestId('single-comment')).toHaveLength(0);
    });

    it('click on commented books charged on DOM ', async () => {
        const [firstBookCard] = screen.getAllByTestId('book-card');
        fireEvent.click(firstBookCard);
        expect(await screen.findAllByTestId('single-comment')).not.toHaveLength(0);
    });
});

