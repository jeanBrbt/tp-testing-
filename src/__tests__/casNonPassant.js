import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import App from '../app';
import { submitForm } from '../api';

jest.mock('../api', () => ({
  submitForm: jest.fn().mockRejectedValue(new Error('les champs food et drink sont obligatoires')),
}));

describe('### Second scénario : cas non passant', () => {  
  render(<App />);
  test('### Second scénario : cas non passant', async () => {
    submitForm.mockRejectedValue({ message: 'les champs food et drink sont obligatoires' });
    
        // 2 - Un titre "Welcome home" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/Welcome home/i)

        // 3 - Un lien "Fill out the form" est dans le document
        expect(screen.getByRole('link', { name: /Fill out the form/i })).toBeInTheDocument()

        //4 - l'utilisateur clique sur le lien
        user.click(screen.getByRole('link', { name: /Fill out the form/i }))

        //5 - l'utilisateur est redirigé sur la page 1
        //6 - Un titre "Page 1" est dans le document
        expect(screen.getByRole('heading')).toHaveTextContent(/Page 1/i)
        //7 - un lien "Go home" est dans le document
        expect(screen.getByRole('link', { name: /Go home/i })).toBeInTheDocument()

        //8 - Un champ avec le label "Favorite food" est dans le document
        expect(screen.getByLabelText(/favorite food/i)).toBeInTheDocument();

        // 9. Rempli le champ "Favorite food"
        user.type(screen.getByLabelText(/favorite food/i), '');

        //10 - un lien "Next" est dans le document
        expect(screen.getByRole('link', { name: /next/i })).toBeInTheDocument();

        //11 - l'utilisateur clique sur le lien "Next"
        //12- l'utilisateur est redirigé sur la page 2

        user.click(screen.getByText(/next/i));

        //13 - Un titre "Page 2" est dans le document
        expect(screen.getByText(/page 2/i)).toBeInTheDocument();

        //14 - un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();

        //15 - Un champ avec le label "Favorite drink" est dans le document
        expect(screen.getByLabelText(/favorite drink/i)).toBeInTheDocument();

        //16 - l'utilisateur rempli le champ avec "Bière"
        user.type(screen.getByLabelText(/favorite drink/i), 'Bières');

        //17 - un lien "Review" est dans document
        expect(screen.getByRole('link', { name: /review/i })).toBeInTheDocument();

        //18 - l'utilisateur clique sur le lien 'Review'
        //19 - l'utilisateur est redirigé sur la page de confirmation
        user.click(screen.getByText(/review/i));

        //20 - Un titre "Confirm" est dans le document
        expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();

        //21 - Un texte "Please confirm your choices" est dans le document
        expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument();
        
        //22 - Un texte label "favorite food" a pour contenu ""
        expect(screen.getByLabelText(/favorite food/i)).toHaveTextContent('');
        
        //23 - Un texte label "favorite drink" a pour contenu "Bière"
        expect(screen.getByLabelText(/favorite drink/i)).toHaveTextContent('Bières');

        //24 - un lien "Go back" est dans le document
        expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();

        //25 - un bouton "Confirm" est dans le document
        expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();

        //26 - l'utilisateur clique sur le bouton "Confirm"
        //27 - l'utilisateur est redirigé sur la page d'erreur
        user.click(screen.getByRole('button', { name: /confirm/i }));

        //28 - Un texte "Oh no. There was an error." est dans le document
        await waitFor(() => {
            expect(screen.getByText(/oh no. there was an error./i)).toBeInTheDocument();
            });

        //29 - Un texte "les champs food et drink sont obligatoires" est dans le document
        expect(screen.getByText("les champs food et drink sont obligatoires")).toBeInTheDocument();

        //30 - un lien "Go home" est dans le document
        expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();

        //31 - un lien "Try again" est dans le document
        expect(screen.getByRole('link', { name: /try again/i })).toBeInTheDocument();

        //32 - l'utilisateur clique sur le lien "Try again"
        //33 - l'utilisateur est redirigé sur la page 1
        user.click(screen.getByText(/try again/i));

        //34 - Un titre "Page 1" est dans le document
        expect(screen.getByText(/page 1/i)).toBeInTheDocument();

  });
});