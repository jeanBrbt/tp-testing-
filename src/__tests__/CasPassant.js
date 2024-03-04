import * as React from 'react'
import {render, waitFor, screen} from '@testing-library/react'
import user from '@testing-library/user-event'

import App from '../app'
import {submitForm} from '../api'

jest.mock('../api', () => ({
  submitForm: jest.fn().mockResolvedValue({data: 'response data'}),
}))

describe('Integration Test for Multi-Step Form Submission', () => {
  beforeEach(() => {
    submitForm.mockResolvedValue({message: 'Form submitted successfully'})
  })
  //  1 - l'utilisateur est sur la Home

  test('Cas passant ', async () => {
    render(<App />)

    // 2 - Un titre "Welcome home" est dans le document
    expect(screen.getByRole('heading')).toHaveTextContent(/Welcome home/i)

    // 3 - Un lien "Fill out the form" est dans le document
    expect(
      screen.getByRole('link', {name: /Fill out the form/i}),
    ).toBeInTheDocument()

    //4 - l'utilisateur clique sur le lien
    user.click(screen.getByRole('link', {name: /Fill out the form/i}))

    //5 - l'utilisateur est redirigé sur la page 1
    //6 - Un titre "Page 1" est dans le document
    expect(screen.getByRole('heading')).toHaveTextContent(/Page 1/i)

    //7 - un lien "Go home" est dans le document
    expect(screen.getByRole('link', {name: /Go home/i})).toBeInTheDocument()

    //8 - Un champ avec le label "Favorite food" est dans le document
    expect(screen.getByLabelText(/favorite food/i)).toBeInTheDocument()

    //9 - l'utilisateur rempli le champ avec "Les pâtes"
    user.type(screen.getByLabelText(/favorite food/i), 'Les pâtes')

    //10 - un lien "Next" est dans le document
    expect(screen.getByRole('link', {name: /Next/i})).toBeInTheDocument()

    //11 - l'utilisateur clique sur le lien "Next"
    //12- l'utilisateur est redirigé sur la page 2
    user.click(screen.getByText('Next'))

    //13 - Un titre "Page 2" est dans le document
    expect(screen.getByText('Page 2')).toBeInTheDocument()

    //14 - un lien "Go back" est dans le document
    expect(screen.getByRole('link', {name: /Go back/i})).toBeInTheDocument()

    //15 - Un champ avec le label "Favorite drink" est dans le document
    expect(screen.getByLabelText(/favorite drink/i)).toBeInTheDocument()

    //16 - l'utilisateur rempli le champ avec "Bière"
    user.type(screen.getByLabelText(/favorite drink/i), 'Bières')

    //17 - un lien "Review" est dans document
    expect(screen.getByRole('link', {name: /Review/i})).toBeInTheDocument()

    //18 - l'utilisateur clique sur le lien "Review"
    user.click(screen.getByText(/review/i))

    //19 - l'utilisateur est redirigé sur la page de confirmation
    //20 - Un titre "Confirm" est dans le document
    expect(screen.getByRole('button', {name: 'Confirm'})).toBeInTheDocument()

    //21 - Un texte "Please confirm your choices" est dans le document
    expect(screen.getByText(/please confirm your choices/i)).toBeInTheDocument()

    //22 - Un texte label "favorite food" a pour contenu "Les pâtes"
    expect(screen.getByText(/les pâtes/i)).toBeInTheDocument()

    //23 - Un texte label "favorite drink" a pour contenu "Bière"
    expect(screen.getByText(/bière/i)).toBeInTheDocument()

    //24 - un lien "Go back" est dans le document
    expect(screen.getByRole('link', {name: /Go back/i})).toBeInTheDocument()

    //25 - un bouton "Confirm" est dans le document
    expect(screen.getByRole('button', {name: /Confirm/i})).toBeInTheDocument()

    //26 - l'utilisateur clique sur le bouton "Confirm"
    user.click(screen.getByRole('button', {name: 'Confirm'}))

    //27 - l'utilisateur est redirigé sur la page de Félicitation
    //28 - Un titre "Congrats.You did it." est dans le document
    await waitFor(() => {
      expect(screen.getByText('Congrats. You did it.')).toBeInTheDocument()
    })

    //29 - un lien "Go home" est dans le document
    expect(screen.getByRole('link', {name: /Go home/i})).toBeInTheDocument()

    //30 - l'utilisateur clique sur le lien "Go Home"
    user.click(screen.getByText(/go home/i))

    //31 - l'utilisateur est redirigé sur la home
    //32 - Un titre "Welcome home" est dans le document

    await waitFor(() => {
      expect(screen.getByText(/welcome home/i)).toBeInTheDocument()
    })
  })
})
