<h2>Message de {{ $contact['firstname'] }} {{ $contact['lastname'] }}</h2>

<p><strong>Email :</strong> {{ $contact['email'] }}</p>
<p><strong>Sujet :</strong> {{ $contact['subject'] }}</p>
<p><strong>Message :</strong></p>
<p>{{ $contact['message'] }}</p>
<p>Envoyé le {{ $contact['created_at']->format('d/m/Y H:i') }}</p>
<p>Merci de votre attention.</p>
<p>Ce message a été envoyé depuis le formulaire de contact du site {{ config('app.name') }}.</p>
<p>Vous pouvez répondre à ce message en utilisant l'adresse email ci-dessus.</p>
<p>Si vous ne souhaitez plus recevoir de messages de ce type, veuillez nous en informer.</p>
<p>Bien cordialement,</p>
<p>L'équipe de {{ config('app.name') }}</p>
<p>Contact : <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a></p>
<p>Site web : <a href="{{ config('app.url') }}">{{ config('app.url') }}</a></p>
<p>Adresse : {{ config('app.address') }}</p>
<p>Téléphone : {{ config('app.phone') }}</p>
<p>Suivez-nous sur les réseaux sociaux :</p>
<p>
    <a href="{{ config('app.facebook') }}">Facebook</a> |
    <a href="{{ config('app.twitter') }}">Twitter</a> |
    <a href="{{ config('app.instagram') }}">Instagram</a>
</p>
<p>Ce message est généré automatiquement, merci de ne pas y répondre.</p>
<p>Si vous avez des questions, n'hésitez pas à nous contacter via notre site web.</p>
<p>Nous vous remercions de votre confiance et restons à votre disposition pour toute information complémentaire.</p>
<p>Ce message est envoyé par le système de gestion de {{ config('app.name') }}.</p>
<p>Pour toute question ou demande d'assistance, veuillez nous contacter à l'adresse email ci-dessus.</p>
<p>Nous vous remercions de votre compréhension et de votre collaboration.</p>
<p>Ce message est envoyé dans le cadre de la gestion des contacts de {{ config('app.name') }}.</p>
<p>Nous vous remercions de votre intérêt pour nos services et restons à votre disposition pour toute information complémentaire.</p>
