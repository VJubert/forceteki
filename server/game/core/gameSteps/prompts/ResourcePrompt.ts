import { Card } from '../../card/Card';
import type Game from '../../Game';
import type Player from '../../Player';
import Contract from '../../utils/Contract';
import { AllPlayerPrompt } from './AllPlayerPrompt';

export class ResourcePrompt extends AllPlayerPrompt {
    protected selectedCards = new Map<string, Card[]>();
    protected selectableCards = new Map<string, Card[]>();

    public constructor(
        game: Game,
        private readonly nCardsToResource: number
    ) {
        super(game);
        game.getPlayers().forEach((player) => this.selectedCards[player.name] = []);
    }

    public override completionCondition(player: Player) {
        const nSelectedCards = this.selectedCards[player.name].length;
        return nSelectedCards === this.nCardsToResource;
    }

    public override continue() {
        if (!this.isComplete()) {
            this.highlightSelectableCards();
        } else {
            this.game.getPlayers().forEach((player) => this.resourceSelectedCards(player));
        }

        return super.continue();
    }

    public highlightSelectableCards() {
        this.game.getPlayers().forEach((player) => {
            // cards are only selectable until we've selected as many as allowed
            if (!this.selectableCards[player.name] && !this.completionCondition(player)) {
                this.selectableCards[player.name] = player.hand;
            } else {
                this.selectableCards[player.name] = [];
            }
            player.setSelectableCards(this.selectableCards[player.name]);
        });
    }

    public override activePrompt() {
        let promptText = null;
        if (this.nCardsToResource !== 1) {
            promptText = `Select ${this.nCardsToResource} cards to resource`;
        } else {
            promptText = 'Select 1 card to resource';
        }

        return {
            selectCard: true,
            menuTitle: promptText,
            buttons: [],
            promptTitle: 'Resource Step'
        };
    }

    public override onCardClicked(player: Player, card: Card) {
        if (!Contract.assertNotNullLike(player) ||
            !Contract.assertNotNullLike(card)) {
            return false;
        }

        if (!this.activeCondition(player)) {
            return false;
        }

        if (!this.selectedCards[player.name].includes(card)) {
            this.selectedCards[player.name].push(card);
        } else {
            this.selectedCards[player.name] = this.selectedCards[player.name].filter((c) => c !== card);
        }

        player.setSelectedCards(this.selectedCards[player.name]);
        return true;
    }

    public override waitingPrompt() {
        return {
            menuTitle: 'Waiting for opponent to choose cards to resource'
        };
    }

    public override menuCommand(player, arg) {
        return false;
    }

    protected resourceSelectedCards(player: Player) {
        if (this.selectedCards[player.name].length > 0) {
            for (const card of this.selectedCards[player.name]) {
                player.resourceCard(card);
            }
            this.game.addMessage('{0} has resourced {1} cards from hand', player, this.selectedCards[player.name].length);
        } else {
            this.game.addMessage('{0} has not resourced any cards', player);
        }
    }
}