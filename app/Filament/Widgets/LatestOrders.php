<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class LatestOrders extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected function getTableQuery(): Builder
    {
        return Order::query()->latest();
    }

    protected function getTableColumns(): array
    {
        return [
            TextColumn::make('user.name')
                ->label('Customer'),
            TextColumn::make('total_amount')
                ->money('IDR', true)
                ->label('Total'),
            BadgeColumn::make('status')
                ->colors([
                    'primary' => static fn ($state): bool => $state === 'order placed',
                    'secondary' => static fn ($state): bool => $state === 'pending',
                    'warning' => static fn ($state): bool => $state === 'processing',
                    'success' => static fn ($state): bool => $state === 'completed',
                    'danger' => static fn ($state): bool => $state === 'canceled',
                ])
                ->icons([
                    'heroicon-o-shopping-cart' => static fn ($state): bool => $state === 'order placed',
                    'heroicon-o-clock' => static fn ($state): bool => $state === 'pending',
                    'heroicon-o-refresh' => static fn ($state): bool => $state === 'processing',
                    'heroicon-o-check-circle' => static fn ($state): bool => $state === 'completed',
                    'heroicon-o-x-circle' => static fn ($state): bool => $state === 'canceled',
                ]),
        ];
    }
}
