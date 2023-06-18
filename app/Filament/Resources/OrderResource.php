<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Order Information')->schema([
                    Grid::make()->schema([
                        TextInput::make('user_id')
                            ->disabled()
                            ->required(),
                        Select::make('status')
                            ->preload()
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'completed' => 'Completed',
                                'cancelled' => 'Cancelled',
                            ])
                            ->required(),
                    ]),
                    Grid::make(4)->schema([
                        TextInput::make('subtotal')
                            ->numeric()
                            ->required(),
                        TextInput::make('discount')
                            ->numeric()
                            ->required(),
                        TextInput::make('tax')
                            ->numeric()
                            ->required(),
                        TextInput::make('total_amount')
                            ->numeric()
                            ->required(),
                    ]),
                    Repeater::make('paymentDetail')
                        ->relationship()
                        ->schema([
                            Grid::make()->schema([
                                TextInput::make('transaction_id')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('transaction_time')
                                    ->disabled()
                                    ->required(),
                            ]),
                            Grid::make(3)->schema([
                                TextInput::make('payment_type')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('status')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('gross_amount')
                                    ->disabled()
                                    ->required(),
                            ]),
                        ]),
                    Repeater::make('shipping')
                        ->relationship()
                        ->schema([
                            Grid::make()->schema([
                                TextInput::make('first_name')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('last_name')
                                    ->disabled()
                                    ->required(),
                            ]),
                            Grid::make()->schema([
                                TextInput::make('email')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('phone')
                                    ->disabled()
                                    ->required(),
                            ]),
                            TextInput::make('address')
                                ->disabled()
                                ->required(),
                            Grid::make(3)->schema([
                                TextInput::make('city_name')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('province')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('postal_code')
                                    ->disabled()
                                    ->required(),
                            ]),
                            Repeater::make('courier')
                                ->schema([
                                    Grid::make(3)->schema([
                                        TextInput::make('code')
                                            ->disabled()
                                            ->required(),
                                        TextInput::make('service')
                                            ->disabled()
                                            ->required(),
                                        TextInput::make('description')
                                            ->disabled()
                                            ->required(),
                                    ]),
                                    Repeater::make('cost')
                                        ->schema([
                                            Grid::make(2)->schema([
                                                TextInput::make('value')
                                                    ->disabled()
                                                    ->required(),
                                                TextInput::make('etd')
                                                    ->label('Estimation Time Delivery (days)')
                                                    ->disabled()
                                                    ->required(),
                                            ]),
                                            RichEditor::make('note')
                                                ->toolbarButtons([
                                                    'blockquote',
                                                    'bold',
                                                    'bulletList',
                                                    'italic',
                                                    'orderedList',
                                                    'strike',
                                                    'underline',
                                                ])->required(),
                                        ]),
                                ]),
                        ]),
                ]),
                Section::make('Order Items')->schema([
                    Repeater::make('orderItems')
                        ->relationship()
                        ->schema([
                            TextInput::make('product_id')
                                ->disabled()
                                ->required(),
                            RichEditor::make('description')
                                ->toolbarButtons([
                                    'blockquote',
                                    'bold',
                                    'bulletList',
                                    'italic',
                                    'orderedList',
                                    'strike',
                                    'underline',
                                ])
                                ->required(),
                            Grid::make()->schema([
                                TextInput::make('qty')
                                    ->label('Quantity')
                                    ->numeric()
                                    ->required(),
                                TextInput::make('price')
                                    ->mask(fn (TextInput\Mask $mask) => $mask->money(prefix: 'Rp', thousandsSeparator: '.', decimalPlaces: 0))
                                    ->numeric()
                                    ->required(),
                            ]),
                            SpatieMediaLibraryFileUpload::make('designs')
                                ->multiple()
                                ->enableDownload(true)
                                ->collection('designs')
                                ->responsiveImages(),
                            Repeater::make('variants')
                                ->schema([
                                    TextInput::make('name'),
                                    TextInput::make('value'),
                                ])->grid(2)->collapsed(),
                        ])->grid(2),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.name')
                    ->label('Customer')
                    ->searchable(),
                BadgeColumn::make('status')
                    ->sortable(),
                TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('IDR', true),
                TextColumn::make('created_at')
                    ->label('Order Date')
                    ->date('l F, Y')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
                ViewAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // 'items' => RelationManagers\OrderItemsRelationManager::class,
            // 'paymentDetail' => RelationManagers\PaymentDetailRelationManager::class,
            // 'shipping' => RelationManagers\ShippingRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
            'view' => Pages\ViewOrder::route('/{record}'),
        ];
    }
}
